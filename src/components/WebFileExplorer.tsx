import React, { useState } from "react";
import '../App.css';
import fileLogo from '../resources/icons/file.svg';
import folderLogo from '../resources/icons/folder.svg';
import openFolderLogo from '../resources/icons/openFolder.svg';
import htmlLogo from '../resources/icons/html.svg';
import svgLogo from '../resources/icons/svg.svg';
import jsLogo from '../resources/icons/js.svg';
import tsLogo from '../resources/icons/ts.svg';
import imgLogo from '../resources/icons/img.svg';
import Menu from "./Menu";

interface File {
    //type: 'file' | 'folder';
    type: string;
    name: string;  
    meta?: string;
    data?: File[]
}

interface WebFileExplorerProps {
    files: File
}

const WebFileExplorer: React.FC<WebFileExplorerProps> = ({files}) => {
    const [openedFolders, setOpenedFolders] = useState<string[]>([]);
    const [selectedFile, setSelectedFile] = useState<File>({
        type: '',
        name: '',
        meta: '',
        data: []
    });
    const [menuPosition, setMenuPosition] = useState<{x: number, y: number}>({x:0, y: 0})
    const clickFolderHandle = (folderName: string) => {
        if (openedFolders.includes(folderName)) {
            setOpenedFolders(openedFolders.filter(folder => folder !== folderName));
        } else {
            setOpenedFolders([...openedFolders, folderName]);
        }
    }
    const getFolderLogo = (isOpen: boolean) => {
        if (isOpen) {
            return openFolderLogo
        }
        return folderLogo
    }
    const getLogo = (meta?:string) => {
        if (!meta) {
            return fileLogo
        }
        switch (meta) {
            case 'html':
                return htmlLogo
            case 'js':
                return jsLogo
            case 'ts':
                return tsLogo
            case 'img':
            case 'png':
                return imgLogo
            case 'svg':
                return svgLogo
            default:
                return fileLogo;
        }
    }
    const getFileId = (file: File) => {
        return [file.name, file.meta].join('_')
    }
    const handleClick = (file:File) => {
        console.log('selected')
        if (file.type === 'folder') {
            clickFolderHandle(file.name);
        } else {
            console.log('selected')
            setSelectedFile(file)
        }
    }
    const contextClick = (e:React.MouseEvent, file: File) => {
        e.preventDefault();
        setSelectedFile(file)
        setMenuPosition({ x: e.clientX, y: e.clientY })
    }

    const displayFiles = (files: File[]) => {
        return (
            <div className="explorer">
                {files.map((file, index) => (
                    <div key={index} className={(getFileId(selectedFile) === getFileId(file))? 'file selected-file': 'file'}>
                        {file.type === 'folder' && (
                            <div onClick={() => handleClick(file)}>
                                {openedFolders.includes(file.name)? '' : <span className="logo">&#8627;</span>}
                                <img src={getFolderLogo(openedFolders.includes(file.name))} alt='' width="32" height="32"></img>
                                <span className="file-name">{file.name}</span>
                            </div>
                        )}
                        {file.type === 'file' && (
                            <div onClick={() => handleClick(file)} onContextMenu={(e) => contextClick(e, file)}>
                                <img src={getLogo(file.meta)} alt='' width="32" height="32"></img>
                                <span className="file-name">{file.name}</span>
                            </div>
                        )}
                    
                        {file.type === 'folder' && openedFolders.includes(file.name) && displayFiles(file.data || []) }
                    </div>
                ))}
                <Menu file={selectedFile} position={menuPosition} setMenuPosition={setMenuPosition} setSelectedFile={setSelectedFile}></Menu>
            </div>
        )
    }
    return (
        <>
            <h1>Files</h1>
            <div>{displayFiles([files])}</div>
        </>
    )
}

export default WebFileExplorer;