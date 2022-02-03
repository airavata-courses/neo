import Widget from "../model/widget.model";

export async function addWidget({ station, feature, date, email }) {
    try {
        const newWidget = new Widget({
            station,
            feature,
            date,
            email
        });

        const widgetResponse = await newWidget.save();
        if (!!widgetResponse) {
            return { status: true };
        }
        else {
            return { status: false };
        }
    } catch (err) {
        return { status: false };
    }
}

export async function showHistory(req) {
    try {
        const { page = 1, limit = 10 } = req
        const rows = await Widget.countDocuments();
        const history = await Widget.find({email: req.email})
            .select(["station", "feature", "date"])
            .limit(limit)
            .skip(((!page || page < 0 ? 1: +page) - 1) * limit)
            .exec();

        if (!!history && history.length > 0) {
            return {
                history: JSON.stringify({ history }),
                totalPages: Math.ceil(rows / limit),
                currentPage: page,
                exist: true
            };
        }
    } catch (err) {
        console.log(err)
        return {
            exist: false
        };
    }
}