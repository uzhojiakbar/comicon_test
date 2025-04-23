import styled, { keyframes } from "styled-components";


const shimmer = keyframes`
    0% {
        background-position: -1000px 0;
    }
    100% {
        background-position: 1000px 0;
    }
`;

export const EventSkeleton = styled.div`
    background-color: ${({ theme }) =>
        theme === 'dark' ? '#1f1f27' : '#f0f0f0'};
    background-image: ${({ theme }) =>
        theme === 'dark'
            ? 'linear-gradient(110deg, #1f1f27 25%, #2b2b35 50%, #1f1f27 75%)'
            : 'linear-gradient(110deg, #f0f0f0 25%, #fafafa 50%, #f0f0f0 75%)'};
    background-size: 400% 100%;
    animation: ${shimmer} 2s ease-in-out infinite;
    box-shadow: ${({ theme }) =>
        theme === 'dark'
            ? '0 8px 20px rgba(0,0,0,0.4)'
            : '0 8px 20px rgba(0,0,0,0.1)'};
    transition: all 0.3s ease;

    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 30px 52px;
    align-items: center;
    align-self: stretch;
    gap: 22px;
    width: 550px;
    height: 500px;
    border-radius: 48px;
`;


export const BannerWrapper = styled.div`
    border-radius: 48px;
    height: 500px;
    width: 100%;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-image: ${({ banner }) => `url(${banner})`};
`;

export const BannerSkeleton = styled.div`
    width: 100%;
    height: 500px;
    border-radius: 48px;
    background-color: ${({ theme }) =>
        theme === 'dark' ? '#1f1f27' : '#eeeeee'};
    background-image: ${({ theme }) =>
        theme === 'dark'
            ? 'linear-gradient(110deg, #1f1f27 25%, #2e2e38 50%, #1f1f27 75%)'
            : 'linear-gradient(110deg, #eeeeee 25%, #f5f5f5 50%, #eeeeee 75%)'};
    background-size: 400% 100%;
    animation: ${shimmer} 3s ease-in-out infinite;
    box-shadow: ${({ theme }) =>
        theme === 'dark'
            ? '0 12px 32px rgba(0,0,0,0.35)'
            : '0 12px 32px rgba(0,0,0,0.1)'};
    transition: transform 0.3s ease;
    transform: scale(1);
`;

// ========================================================


export const MainEventSkeleton = styled.div`
  background-color: ${({ theme }) =>
    theme === "dark" ? "#1f1f27" : "#f0f0f0"};
  background-image: ${({ theme }) =>
    theme === "dark"
      ? "linear-gradient(110deg, #1f1f27 25%, #2b2b35 50%, #1f1f27 75%)"
      : "linear-gradient(110deg, #f0f0f0 25%, #fafafa 50%, #f0f0f0 75%)"};
  background-size: 400% 100%;
  animation: ${shimmer} 2s ease-in-out infinite;
  box-shadow: ${({ theme }) =>
    theme === "dark"
      ? "0 8px 20px rgba(0,0,0,0.4)"
      : "0 8px 20px rgba(0,0,0,0.1)"};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px 52px;
  align-items: center;
  gap: 22px;
  width: 324px;
  height: 360px;
  border-radius: 28px;
`;

// const shimmer = keyframes`
//     0% {
//         background-position: -1000px 0;
//     }
//     100% {
//         background-position: 1000px 0;
//     }
// `;
//
// const pulse = keyframes`
//     0% {
//         background-position: 0% 50%;
//         filter: brightness(0.95);
//     }
//     50% {
//         background-position: 100% 50%;
//         filter: brightness(1.05);
//     }
//     100% {
//         background-position: 0% 50%;
//         filter: brightness(0.95);
//     }
// `;
//
//
// const wave = keyframes`
//     0% {
//         background-position: 200% 0;
//     }
//     100% {
//         background-position: -200% 0;
//     }
// `;
//
// const pulseWave = keyframes`
//     0% {
//         background-position: 200% 0;
//     }
//     100% {
//         background-position: -200% 0;
//     }
// `;
// export const BannerSkeleton = styled.div`
//     border-radius: 48px;
//     height: 500px;
//     width: 100%;
//     background: linear-gradient(
//             270deg,
//             ${({theme}) => (theme === 'dark' ? '#1f2028' : '#e0e0e0')} 0%,
//             ${({theme}) => (theme === 'dark' ? '#2a2b34' : '#f5f5f5')} 50%,
//             ${({theme}) => (theme === 'dark' ? '#1f2028' : '#e0e0e0')} 100%
//     );
//     background-size: 400% 400%;
//     animation: ${pulse} 2s ease-in-out infinite;
//     transition: all 0.3s ease;
//     box-shadow: ${({theme}) =>
//             theme === 'dark'
//                     ? '0 4px 15px rgba(0,0,0,0.4)'
//                     : '0 4px 15px rgba(0,0,0,0.1)'};
//     transform: scale(1);
//
//     &:hover {
//         transform: scale(1.01);
//     }
// `;
// export const BannerSkeleton = styled.div`
//     border-radius: 48px;
//     height: 500px;
//     width: 100%;
//     background: ${({theme}) =>
//             theme === 'dark'
//                     ? 'linear-gradient(120deg, #1f2028 30%, #2a2b34 50%, #1f2028 70%)'
//                     : 'linear-gradient(120deg, #e0e0e0 30%, #f5f5f5 50%, #e0e0e0 70%)'};
//     background-size: 200% 100%;
//     animation: ${shimmer} 2s infinite linear;
//     box-shadow: ${({theme}) =>
//             theme === 'dark'
//                     ? '0 8px 24px rgba(0, 0, 0, 0.4)'
//                     : '0 8px 24px rgba(0, 0, 0, 0.1)'};
//     transition: transform 0.3s ease;
//     transform: scale(1);
//
//     &:hover {
//         transform: scale(1.01);
//     }
// `;




