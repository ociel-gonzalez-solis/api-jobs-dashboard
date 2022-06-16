const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllJobs = async (req, res, next) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  console.log(jobs);
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getJob = async (req, res, next) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  });

  if (!job) {
    throw new NotFoundError(`No job found with id ${jobId}`);
  }

  res.status(StatusCodes.OK).json({ job });
};

const postCreateJob = async (req, res, next) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const patchUpdateJob = async (req, res, next) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;

  if (company === " " || position === " ") {
    throw new BadRequestError(`Company or Position cannot be empty`);
  }

  const job = await Job.findByIdAndUpdate(
    {
      _id: jobId,
      createdBy: userId,
    },
    req.body,
    { new: true, runValidators: true }
  );

  if (!job) {
    throw new NotFoundError(`No job found with id ${jobId}`);
  }

  res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res, next) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findByIdAndRemove({
    _id: jobId,
    createdBy: userId,
  });

  if (!job) {
    throw new NotFoundError(`No job found with id ${jobId}`);
  }

  res.status(StatusCodes.OK).json({ msg: 'Job Deleted' });
};

module.exports = {
  getAllJobs,
  getJob,
  postCreateJob,
  patchUpdateJob,
  deleteJob,
};
