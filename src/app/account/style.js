import styled from "styled-components";
import {Modal} from "antd";
import {motion} from "framer-motion";

export const ModalContainer = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    min-height: 100vh;
    background: transparent;
    backdrop-filter: blur(2px);
    z-index: 999;
`;
export const StyledModal = styled(Modal)`
    color: var(--boxUserName);
    
    display: flex;
    align-items: center;
    justify-content: center;
    height: 75vh;
    .ant-modal-content {
        background: transparent; /* Modal ichki qismi uchun qorong‘i fon */
        padding: 0 !important;
    }
  
`;