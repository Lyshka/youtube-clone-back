import {createError} from "../error.js"
import Comment from "../models/Comment.js"
import Video from "../models/Video.js"

export const addComment = async (req, res, next) => {
	const newComment = new Comment({...req.body, userId: req.user.id})

	try {
		const savedComment = await newComment.save()

		res
			.status(200)
			.json(savedComment)
	} catch (err) {
		next(err)
	}
}

export const deleteComment = async (req, res, next) => {
	try {
		const comment = await Comment.findById(res.params.id)
		const video = await Video.findById(res.params.id)

		if (req.user.id === comment.userId || req.user.id === video.userId) {
			await Comment.findByIdAndDelete(req.params.id)

			res
				.status(200)
				.json({
					message: "The comment has benn deleted"
				})
		} else {
			return next(createError(403, "You can delete only your comment!"))
		}
	} catch (err) {
		next(err)
	}
}

export const getComments = async (req, res, next) => {
	try {
		const comments = await Comment.find({
			VideoId: req.params.VideoId
		})

		res
			.status(200)
			.json(comments)
	} catch (err) {
		next(err)
	}
}