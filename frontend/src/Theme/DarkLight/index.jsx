import styled from "styled-components"

export const LightMode = {
   background: "#fff",
   titleColor: "#262626"
}
export const DarkMode = {
   background: "#262626",
   titleColor: "#fff"
}

export const Themes = {
   dark: DarkMode,
   light: LightMode
}

export const Page = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
min-height: 100vh;
background: ${props => props.theme.background};
`

export const Title = styled.h3`
color: ${props => props.theme.titleColor};
font-size: 40px;
cursor: pointer;
`