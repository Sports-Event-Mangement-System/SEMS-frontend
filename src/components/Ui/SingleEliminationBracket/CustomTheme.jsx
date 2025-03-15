import { createTheme } from "@g-loot/react-tournament-brackets";
export const CustomTheme = createTheme({
    textColor: { main: '#000000', highlighted: '#07090D', dark: '#3E414D' },
    matchBackground: { wonColor: 'linear-gradient(to right, #daebf9, #87b2c4)', lostColor: 'linear-gradient(to right, #daebf9, #87b2c4)' },
    score: {
      background: { wonColor: '#87b2c4', lostColor: '#87b2c4' },
      text: { highlightedWonColor: '#70ff29', highlightedLostColor: '#ff2929' },
    },
    border: {
      color: '#2f3648',
      highlightedColor: '#87b2c4',
    },
    roundHeader: { backgroundColor: '#2f3648', fontColor: '#fff' },
    connectorColor: '#2f3648',
    connectorColorHighlight: '#d5d8dc',
    svgBackground: '#FAFAFA',
});