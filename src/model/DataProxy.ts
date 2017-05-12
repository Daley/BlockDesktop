
import * as fs from 'fs'
const {remote, clipboard} = require('electron');
const {Menu, MenuItem, dialog } = remote;

export class FileVo {
    public name: string;

    public text: string="";
}

export class FolderVo {

    public name: string;

    public files: FileVo[] = [];
}

export class AppVo {

    public list: FolderVo[]=[];
    public name: string = 'unkown';

    public lastEdit: number = 0;

}

export class DataProxy {
    static LAST_FILE='last_file'

    public vo: AppVo;
    protected curFileName: string;

    public init() {
        //上次打开的
        var str = localStorage.getItem(DataProxy.LAST_FILE);
        if (str) {
            var content = fs.readFileSync(str, 'utf-8');
            console.log("read",str);
            this.vo = JSON.parse(content);
            console.log(str,this.vo);
            this.curFileName = str;
        } else {
            this.vo = new AppVo();
        }
    }

    public openFile(filename:string){
        
    }

    /**另存为 */
    public saveAs(fileName: string) {
        console.log('saveAs',fileName);
        this.curFileName=fileName;
        localStorage.setItem(DataProxy.LAST_FILE,fileName);

        var str=JSON.stringify(this.vo);
        fs.writeFile(fileName,str,(e:Error,res)=>{
            console.log("save ok");
        })
    }

    public save() {
        if (this.curFileName) {
            this.saveAs(this.curFileName);
        } else {
            dialog.showSaveDialog((filename: string) => {
                this.saveAs(filename);
            });
        }

    }

    public getFileVoByName(name:string){
        for(var i=0;i<this.vo.list.length;i++){

            var f=this.vo.list[i];
            for(var j=0;j<f.files.length;j++){
                var ff=f.files[j];
                if(ff.name==name){
                    return ff;
                }
            }
        }
        return null;
    }
}