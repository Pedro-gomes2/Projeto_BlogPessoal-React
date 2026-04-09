import Popup from 'reactjs-popup';
import FormPostagem from '../formpostagem/FormPostagem';

import 'reactjs-popup/dist/index.css';

import './ModalPostagem.css'
function ModalPostagem() {
    return (
        <>
            <Popup
                trigger={
                    <button 
                        className='font-mono text-sm font-bold px-6 py-2 
                                   bg-cyan-500/10 text-cyan-400 
                                   border border-cyan-500/40 rounded-xl
                                   hover:bg-cyan-500 hover:text-white 
                                   transition-all duration-300 shadow-lg shadow-cyan-500/10'>
                        Nova Postagem
                    </button>
                }
                modal
            >
                
                <div className="bg-slate-950/80 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                    <div className="flex items-center gap-2 px-6 py-3 bg-white/5 border-b border-white/10">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 ml-2 uppercase tracking-widest">
                            terminal_editor.v2
                        </span>
                    </div>
                    <div className="p-2">
                        <FormPostagem />
                    </div>
                </div>
            </Popup>
        </>
    );
}

export default ModalPostagem;