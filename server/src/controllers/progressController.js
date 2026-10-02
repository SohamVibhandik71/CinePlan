import EpisodeProgress from "../models/EpisodeProgress.js";
import { getTVSeasons } from "../../services/tmdbServices.js";

export const markEpisodeWatched = async (req, res) => {
    try {
        const {
            contentId,
            seasonNumber,
            episodeNumber
        } = req.body;

        if (
            contentId === undefined ||
            seasonNumber === undefined ||
            episodeNumber === undefined
        ) {
            return res.status(400).json({
                success: false,
                message: "contentId, seasonNumber and episodeNumber are required"
            });
        }

        const existingProgress = await EpisodeProgress.findOne({
            userId: req.user._id,
            contentId,
            seasonNumber,
            episodeNumber
        });

        if (existingProgress) {
            existingProgress.watched = true;
            existingProgress.watchedAt = new Date();

            await existingProgress.save();

            return res.status(200).json({
                success: true,
                message: "Episode marked as watched",
                data: existingProgress
            });
        }

        const progress = await EpisodeProgress.create({
            userId: req.user._id,
            contentId,
            seasonNumber,
            episodeNumber,
            watched: true,
            watchedAt: new Date()
        });

        return res.status(201).json({
            success: true,
            message: "Episode marked as watched",
            data: progress
        });

    } catch (error) {
        console.error("Error marking episode as watched:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update episode progress"
        });
    }
};

export const getContentProgress = async (req, res) => {
  try {
    const { contentId } = req.params;

    const progress = await EpisodeProgress.find({
      userId: req.user._id,
      contentId
    }).sort({
      seasonNumber: 1,
      episodeNumber: 1
    });

    return res.status(200).json({
      success: true,
      data: progress
    });

  } catch (error) {
    console.error("Error fetching episode progress:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch episode progress"
    });
  }
};

export const updateEpisodeProgress = async (req, res) => {
  try {
    const { id } = req.params;
    const { watched } = req.body;

    if (watched === undefined) {
      return res.status(400).json({
        success: false,
        message: "watched is required"
      });
    }

    const progress = await EpisodeProgress.findOne({
      _id: id,
      userId: req.user._id
    });

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: "Episode progress not found"
      });
    }

    progress.watched = watched;
    progress.watchedAt = watched ? new Date() : null;

    await progress.save();

    return res.status(200).json({
      success: true,
      message: watched
        ? "Episode marked as watched"
        : "Episode marked as unwatched",
      data: progress
    });

  } catch (error) {
    console.error("Error updating episode progress:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update episode progress"
    });
  }
};

export const getProgressSummary = async (req, res) => {
  try {
    const { contentId } = req.params;

    // Get user's tracked episodes
    const progress = await EpisodeProgress.find({
      userId: req.user._id,
      contentId
    });

    // Get actual episode counts from TMDB
    const tmdbResponse = await getTVSeasons(contentId);
    const show = tmdbResponse.data;

    // Ignore Season 0 (specials)
    const normalSeasons = show.seasons?.filter(
      (season) => season.season_number > 0
    ) || [];

    const totalEpisodes = normalSeasons.reduce(
      (total, season) => total + season.episode_count,
      0
    );

    // Only count watched episodes from normal seasons
    const watchedEpisodes = progress.filter(
      (episode) =>
        episode.watched &&
        episode.seasonNumber > 0
    ).length;

    const progressPercentage =
      totalEpisodes > 0
        ? Number(((watchedEpisodes / totalEpisodes) * 100).toFixed(2))
        : 0;

    // Season-wise progress
    const seasons = normalSeasons.map((season) => {
      const seasonWatched = progress.filter(
        (episode) =>
          episode.watched &&
          episode.seasonNumber === season.season_number
      ).length;

      const seasonPercentage =
        season.episode_count > 0
          ? Number(
              ((seasonWatched / season.episode_count) * 100).toFixed(2)
            )
          : 0;

      return {
        seasonNumber: season.season_number,
        totalEpisodes: season.episode_count,
        watchedEpisodes: seasonWatched,
        progressPercentage: seasonPercentage
      };
    });

    return res.status(200).json({
      success: true,
      data: {
        contentId: Number(contentId),
        totalEpisodes,
        watchedEpisodes,
        progressPercentage,
        seasons
      }
    });

  } catch (error) {
    console.error("Error fetching progress summary:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch progress summary"
    });
  }
};