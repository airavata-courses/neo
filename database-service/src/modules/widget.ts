import { stringify } from "querystring";
import Widget from "../model/widget.model";

export function addWidget({station, feature, date, email}) {
    try {
        const newWidget = new Widget({
            station,
            feature,
            date,
            email
        });

        return newWidget.save()
        .then(() => {
            return new Promise(resolve => {
                resolve(true);
            });
        })
        .catch(err => {
            return new Promise(resolve => {
                resolve(false);
            });
        })
    } catch (err) {
        return new Promise(resolve => {
            resolve(false);
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
                    history: stringify({history}),
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