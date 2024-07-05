import styled from 'styled-components'

export const CustomButton = styled.button`
    background-color: transparent;
    margin: 4px;
    color: ${props => (props.isActive ? '#2563eb' : '#64748b')};
    border: none;
    font-size: 22px;
`
export const HomeRouteContainer = styled.div`
    background-color: ${props => (props.isDark ? '#181818' : '#f9f9f9')};
    color: ${props => (props.isDark ? '#f9f9f9' : '#181818')};
`
export const RouteContainer = styled.div`
    background-color: ${props => (props.isDark ? '#0f0f0f' : '#f9f9f9')};
    color: ${props => (props.isDark ? '#f9f9f9' : '#0f0f0f')};
`
export const HomeBanner = styled.div`
    background-image: url("https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png");
    background-size: cover;
`
export const LoginButton = styled.button`
    color:#ffffff;
    border:none;
    border-radius: 4px;
    background-color: #3b82f6;
    width: 200px;
    height: 40px;
`
