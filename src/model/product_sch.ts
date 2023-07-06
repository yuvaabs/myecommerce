import { ObjectId } from "mongodb";
import mongoose,{Schema,Document} from "mongoose";
export interface prodtype extends Document{
    productname:string;
    imageid: ObjectId;
    price:number;
    description:string;
}

export const produsch:Schema<prodtype>=new Schema<prodtype>({
    productname:{
        type:String,
        require:true
    },
    imageid:{
        type:ObjectId,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    description:{
        type:String,
        require:true
    }
},{
    versionKey:false
}
)