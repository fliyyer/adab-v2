import React from 'react';
import moment from 'moment';
import Swal from 'sweetalert2';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const NoteCard = ({ note, onEdit, onDelete }) => {
    const handleEdit = () => {
        Swal.fire({
            title: 'Edit Note',
            html: `
                <textarea id="editNote" class="w-full h-32 border border-gray-300 rounded p-2">${note.content}</textarea>
            `,
            confirmButtonText: 'Save',
            showCancelButton: true,
            preConfirm: () => {
                const editedContent = document.getElementById('editNote').value;
                onEdit(note.id, editedContent);
            }
        });
    };

    const handleViewDetail = () => {
        Swal.fire({
            title: 'Note Detail',
            html: `
                <div class="text-justify h-60 p-4 text-md overflow-auto">
                    ${note.content}
                </div>
            `,
            confirmButtonText: 'Close'
        });
    };

    const trimmedContent = note.content.trim().split(/\s+/).slice(0, 75).join(' ');
    const displayContent = trimmedContent.length < note.content.length ? trimmedContent + '...' : trimmedContent;

    return (
        <div className="mb-4 p-4 border border-gray-300 rounded-md shadow-md">
            <div className="flex flex-col justify-start items-start h-32 sm:h-40 md:h-48 lg:h-56">
                <p className="mb-2 text-[8.5px] lg:text-sm 2xl:text-md  text-justify p-2 w-full" onClick={handleViewDetail} style={{ cursor: 'pointer' }}>
                    {displayContent}
                </p>
            </div>
            <div className="flex justify-between items-center">
                <div className="text-xs text-gray-500">{moment(note.createdAt.toDate()).format('MMMM Do, h:mm:ss a')}</div>
                <div className="flex gap-2 right-3">
                    <button onClick={handleEdit} className="bg-[#E48118] text-white py-2 px-4 rounded hover:bg-[#a97339]">
                        <EditOutlined />
                    </button>
                    <button onClick={onDelete} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">
                        <DeleteOutlined />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoteCard;
