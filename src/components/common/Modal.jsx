import React, { useEffect } from 'react';
import { FiX } from 'react-icons/fi';

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    if (!isOpen) return null;

    const sizes = { sm: '400px', md: '560px', lg: '800px', xl: '1000px' };

    return (
        <div className="bh-modal-overlay" onClick={onClose}>
            <div
                className="bh-modal"
                style={{ maxWidth: sizes[size] }}
                onClick={(e) => e.stopPropagation()}
            >
                {title && (
                    <div className="bh-modal-header">
                        <h3 className="bh-modal-title">{title}</h3>
                        <button className="bh-modal-close" onClick={onClose}>
                            <FiX />
                        </button>
                    </div>
                )}
                <div className="bh-modal-body">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
