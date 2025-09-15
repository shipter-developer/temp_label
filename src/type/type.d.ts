export interface receiptsInterface {receipts: receiptType[]}
export interface bagsInterface {bags: bagType[]}
export interface receiptType {
    "packageInfo": {
        reg_date:string,
        label_name: string,
        country_name_en : string,
        "country_code": string,
        "method_name": string,
        "reference_no": string,
        "in_track_no": string,
        "start_track_no": string,
        "box_num": number,
        "r_weight": number,
        "currency": string
    },
    "senderInfo": {
        "name": string,
        "phone": string,
        "email": string,
        "zip": string,
        "state": string,
        "city": string,
        "address1": string,
        "address2": string
    },
    "receiverInfo": {
        "name": string,
        "phone": string,
        "email": string,
        "zip": string,
        "state": string,
        "city": string,
        "address1": string,
        "address2": string,
    },
    "productsInfo": productType[],
    "etcInfo": {"userdata1": string, "userdata2": string}
}

export type productType = { "sku": string, "name": string, "qty": number, "price": number, "brand": string, "url": string, "hscode": string }

export type bagType = {
    "master_id": string,
    "bag_number": string,
    "country_code": string,
    "parcels" : parcelType[]
}
export type parcelType = {
    "weight" : number,
    "in_track_no" : string,
}