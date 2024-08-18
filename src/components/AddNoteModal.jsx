import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { CheckOutlined, CloseOutlined, AudioOutlined, AudioMutedOutlined } from '@ant-design/icons';

const AddNoteModal = ({ showModal, onClose, onSave }) => {
    const [note, setNote] = useState('');
    const [isListening, setIsListening] = useState(false);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const mic = new SpeechRecognition();

    mic.continuous = true;
    mic.interimResults = true;
    mic.lang = "id";

    useEffect(() => {
        handleListen();
        return () => {
            mic.stop();
            mic.onend = () => console.log("Mic stopped");
        };
    }, [isListening]);

    const handleListen = () => {
        if (isListening) {
            mic.start();
            mic.onend = () => {
                console.log("continue..");
                mic.start();
            };
        } else {
            mic.stop();
            mic.onend = () => {
                console.log("Stopped Mic on Click");
            };
        }

        mic.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map((result) => result[0])
                .map((result) => result.transcript)
                .join("");
            console.log(transcript);
            setNote(transcript);
        };

        mic.onerror = (event) => {
            console.error(event.error);
            Swal.fire({
                title: 'Error!',
                text: `Speech recognition error: ${event.error}`,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        };
    };

    const handleSave = () => {
        if (note.trim()) {
            onSave(note.trim());
        } else {
            Swal.fire({
                title: 'Warning!',
                text: 'Transcription is empty. Please try again.',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
        }
        setNote('');
        onClose();
    };

    return (
        showModal && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
                    <div className="flex items-center mb-8 justify-between">
                        <h2 className="text-xl md:text-2xl">Add Note by Voice</h2>
                        <div className="flex justify-end gap-4">
                            <button onClick={handleSave} className="bg-[#E48118] text-white py-2 px-4 rounded hover:bg-[#a97339]">
                                <CheckOutlined className='text-white font-bold' />
                            </button>
                            <button onClick={onClose} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">
                                <CloseOutlined className='text-white font-bold' />
                            </button>
                        </div>
                    </div>
                    <div className="mb-4">
                        <textarea
                            className="w-full h-24 border border-gray-300 rounded p-2"
                            value={note}
                            readOnly
                        />
                    </div>
                    <div className="flex justify-center gap-4">
                        <button onClick={() => setIsListening(true)} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">
                            {isListening ? 'Listening...' : <AudioOutlined className='text-white font-bold' />}
                        </button>
                        <button onClick={() => setIsListening(false)} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">
                            <AudioMutedOutlined className='text-white font-bold' />
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default AddNoteModal;
