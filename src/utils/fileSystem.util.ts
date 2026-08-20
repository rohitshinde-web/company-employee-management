import fs from 'fs';
import path from 'path';

export class FileSystemUtil {
    public static async deleteFileIfAtLocal(relativePath:string): Promise<void>{
        if(!relativePath) return;

        const absolutePath = path.resolve(process.cwd(), relativePath.replace(/^\//,' '));

        try{
            if(fs.existsSync(absolutePath)){
                await fs.promises.unlink(absolutePath);
                console.log(`Successfully deleted old Avtar image : ${absolutePath}`);
            }
        }catch(err){
            console.error(`Failed to delete file at path ${absolutePath}:`,err);
        }
    }

    public static ensureDirectoryExists(dirPath: string): void {
        if(!fs.existsSync(dirPath)){
            fs.mkdirSync(dirPath, {recursive: true})
        }
    }
}