import App from './App';
import {createRoot} from 'react-dom/client';
import {Provider} from "react-redux";
import {store} from "./store/store.ts";


const container = document.getElementById('root')
if(container){
    const root = createRoot(container);
    root.render(
    <Provider store={store} >
        <App />
    </Provider>
    )
}

