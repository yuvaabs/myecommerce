import { ObjectId } from "mongodb";
import mongoose,{Schema,Document} from "mongoose";
export interface imgtype extends Document{
    filename:string;
    image: Buffer;

}

export const imgsch:Schema<imgtype>=new Schema<imgtype>({
    filename:{
        type:String,
        require:true
    },
    image:{
        type:Buffer,
        require:true
    }
},{
    versionKey:false
}
)