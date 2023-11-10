import WebFileExplorer from './components/WebFileExplorer';
import files from './constants/File';

const App: React.FC = () => {
  return (
    <div className="App">
      <WebFileExplorer files={files}></WebFileExplorer>
    </div>
  );
}

export default App;
