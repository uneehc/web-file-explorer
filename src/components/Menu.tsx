import '../App.css';

interface menuPosition {
    x: number;
    y: number;
}
interface File {
    //type: 'file' | 'folder';
    type: string;
    name: string;  
    meta?: string;
    data?: File[]
}
interface MenuProps {
    position: menuPosition;
    file: File;
    setSelectedFile: (file:File) => void;
    setMenuPosition: (position:menuPosition) => void
}

const Menu: React.FC<MenuProps> = ({position, file, setSelectedFile, setMenuPosition}) => {
    const handleMenuItemAction = (action:string) => {
        console.log(`${file.name}: ${action}`)
        closeMenu()
    }
    const closeMenu = () => {
        setMenuPosition({ x: 0, y: 0 });
        setSelectedFile({
            type: '',
            name: '',  
            meta: '',
            data: []
        });
      };
    return (
        <>
            {position.x !== 0 && position.y !== 0 &&

            (<div className="menu"
                style={{
                    position: 'fixed',
                    top: position.y,
                    left: position.x,
                }}
            >
                <div className='menu-item' onClick={() => handleMenuItemAction('Rename')}>Rename</div>
                <div className='menu-item' onClick={() => handleMenuItemAction('Copy')}>Copy</div>
                <div className='menu-item' onClick={() => handleMenuItemAction('Delete')}>Delete</div>
            </div>)
            }
        </>
    )
}
export default Menu