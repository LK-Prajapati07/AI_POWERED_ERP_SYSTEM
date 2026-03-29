import { contestModel } from "../model/contest.model";
export const createContest = async (contestData) => {
    try {
        const {
            title,
            description,
            startTime,
            endTime,
            duration,
            problems,
            maxScore,
            visibility,
            createdBy,
        } = contestData;

        // ✅ Validation
        if (
            !title ||
            !description ||
            !startTime ||
            !endTime ||
            !duration ||
            !problems ||
            !maxScore ||
            !createdBy
        ) {
            throw new Error("All required fields must be provided");
        }

        // ✅ Time validation
        if (new Date(startTime) >= new Date(endTime)) {
            throw new Error("Start time must be before end time");
        }

        // ✅ Create contest
        const contest = new contestModel({
            title,
            description,
            startTime,
            endTime,
            duration,
            problems,
            maxScore,
            visibility,
            createdBy,
            status: "upcoming",
        });

        await contest.save();

        return contest;
    } catch (error) {
        throw error;
    }
};

export const getAllContests = async () => {
    try {
        const contests = await contestModel
            .find({
                isDeleted: false,
                visibility: "public",
            })
            .sort({ startTime: 1 });

        return contests;
    } catch (error) {
        throw error;
    }
};
export const getContestById = async (contestId) => {
    try {
        const contest = await contestModel.findOne({
            _id: contestId,
            isDeleted: false,
        });
        if (!contest) {
            throw new Error("Contest not found");
        }
        return contest;
    } catch (error) {
        throw error;
    }
};
export const joinContest = async (contestId, userId) => {
    try {
        const contest = await contestModel.findOne({
            _id: contestId,
            isDeleted: false,
        });
        if (!contest) {
            throw new Error("Contest not found");
        }
        if (contest.visibility === "private") {
            throw new Error("Cannot join private contest");
        }
        if (contest.participants.includes(userId)) {
            throw new Error("User already joined this contest");
        }
        contest.participants.push(userId);
        await contest.save();
        return contest;
    } catch (error) {
        throw error;
    }
};

export const updateContest = async (contestId, updateData) => {
    try {
        const contest = await contestModel.findOne({ _id: contestId, isDeleted: false });
        if (!contest) {
            throw new Error("Contest not found");
        }
        if (updateData.title) {
            contest.title = updateData.title;
        }
        if (updateData.description) {
            contest.description = updateData.description;
        }
        if (updateData.startTime) {
            contest.startTime = updateData.startTime;
        }
        if (updateData.endTime) {
            contest.endTime = updateData.endTime;
        }
        if (updateData.duration) {
            contest.duration = updateData.duration;
        }
        if (updateData.problems) {
            contest.problems = updateData.problems;

        }
        if (updateData.maxScore) {
            contest.maxScore = updateData.maxScore;
        }
        if (updateData.visibility) {
            contest.visibility = updateData.visibility;
        }
        await contest.save();
        return contest;
    } catch (error) {
        throw error;
    }
}
export const deleteContest = async (contestId) => {
    try {
        const contest = await contestModel.findOne({ _id: contestId, isDeleted: false });
        if (!contest) {
            throw new Error("Contest not found");
        }
        contest.isDeleted = true;
        await contest.save();
        return contest;
    } catch (error) {
        throw error;
    }
}