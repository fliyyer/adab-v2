import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { collection, addDoc, query, where, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import AddNoteModal from '../components/AddNoteModal';
import Swal from 'sweetalert2';
import NoteCard from '../components/NoteCard';
import { Skeleton } from 'antd';

const Notes = () => {
    const [showModal, setShowModal] = useState(false);
    const [notes, setNotes] = useState([]);
    const [user, setUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const notesPerPage = 6;

    useEffect(() => {
        const idToken = sessionStorage.getItem('idToken');
        if (idToken) {
            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    setUser(user);
                    fetchNotes(user.uid);
                }
            });
        }
    }, []);

    const fetchNotes = async (uid) => {
        try {
            setLoading(true);
            const notesQuery = query(collection(db, 'notes'), where('uid', '==', uid));
            const notesSnapshot = await getDocs(notesQuery);
            setNotes(notesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        } catch (error) {
            console.error('Error fetching notes:', error);
            setLoading(false);
        }
    };

    const handleSaveNote = async (noteContent) => {
        if (user) {
            try {
                await addDoc(collection(db, 'notes'), {
                    uid: user.uid,
                    content: noteContent,
                    createdAt: new Date()
                });
                fetchNotes(user.uid);
                Swal.fire({
                    title: 'Success!',
                    text: 'Note added successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to add note. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                console.error('Error adding note: ', error);
            }
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'User is not authenticated.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const handleEditNote = async (noteId, editedContent) => {
        try {
            const noteRef = doc(db, 'notes', noteId);
            await updateDoc(noteRef, {
                content: editedContent
            });
            const updatedNotes = notes.map((note) =>
                note.id === noteId ? { ...note, content: editedContent } : note
            );
            setNotes(updatedNotes);
            Swal.fire({
                title: 'Note Updated!',
                text: 'Note content has been updated successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } catch (error) {
            console.error('Error updating note:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update note. Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const handleDeleteNote = async (noteId) => {
        try {
            const notesRef = doc(db, 'notes', noteId);
            await deleteDoc(notesRef);
            setNotes(notes.filter((note) => note.id !== noteId));
            Swal.fire({
                title: 'Note Deleted!',
                text: 'Note has been deleted successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } catch (error) {
            console.error('Error deleting note:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to delete note. Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const offset = currentPage * notesPerPage;
    const currentNotes = notes.slice(offset, offset + notesPerPage);
    const pageCount = Math.ceil(notes.length / notesPerPage);

    return (
        <main className='py-10 h-auto mx-auto'>
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold mb-4">Notes</h2>
                <button onClick={() => setShowModal(true)} className="bg-[#E48118] flex items-center gap-2 text-white py-2 px-4 rounded hover:bg-[#a97339]">
                    <PlusOutlined className='text-white font-bold' /> Add Note
                </button>
            </div>
            <div>
                {loading ? (
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Array.from({ length: notesPerPage }).map((_, index) => (
                            <Skeleton key={index} active />
                        ))}
                    </div>
                ) : (
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {currentNotes.map((note) => (
                            <NoteCard key={note.id} note={note} onEdit={handleEditNote} onDelete={() => handleDeleteNote(note.id)} />
                        ))}
                    </div>
                )}
                {notes.length > notesPerPage && (
                    <div className="flex justify-center mt-4">
                        {Array.from({ length: pageCount }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageClick(index)}
                                className={`mx-1 px-3 py-1 rounded ${currentPage === index ? 'bg-[#E48118] text-white' : 'bg-gray-300 text-gray-700'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <AddNoteModal showModal={showModal} onClose={() => setShowModal(false)} onSave={handleSaveNote} />
        </main>
    );
}

export default Notes;
