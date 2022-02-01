import Widget from "../model/widget.model";

export async function addWidget({station, feature, date, email}) {
    try {
        const newWidget = new Widget({
            station,
            feature,
            date,
            email
        });

        const widgetResponse = await newWidget.save();
        if (widgetResponse) {
            return new Promise(resolve => {
                resolve({status: true});
            });
        }
        else {
            return new Promise((resolve,reject) => {
                reject({status: false});
            });
        }
    } catch (err) {
        return new Promise((resolve,reject) => {
            reject(err);
        });
    }
}

export async function showHistory(req) {
    try {
        const { page = 1, limit = 10 } = req
        const rows = await Widget.countDocuments();
        const history = await Widget.find()
            .select(req.email)
            .limit(limit)
            .skip((page-1)*limit)
            .exec();

        return new Promise(resolve => {
            resolve({
                history: JSON.stringify({history}),
                totalPages: Math.ceil(rows / limit),
                currentPage: page
            });
        });
    } catch(err) {
        return new Promise(resolve => {
            resolve({
                history: 'failed',
                totalPages: 0,
                currentPage: 0
            });
        })
    }
}