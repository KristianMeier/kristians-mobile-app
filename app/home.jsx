import { SafeAreaWrapper } from "../components/SafeAreaWrapper"
import { images } from "../assets/images/images"
import { StyledView } from "../components/styles/StyledView"
import { StyledLink } from "../components/styles/StyledLink"
import { externalSites } from "../constants/externalSites"
import { StyledImage } from "../components/styles/StyledImage"
import { StyledText } from "../components/styles/StyledText"
import { Navigation } from "../components/Navigation"
import { t } from "../i18n"

const Home = () => {
  return (
    <SafeAreaWrapper>
      <Navigation />
      <StyledText>
        {t("welcome")} {t("name")}
      </StyledText>
      <StyledView>
        <StyledText>Nothing happens when you click me</StyledText>
        <StyledImage
          source={images.blueArrow}
          size="small"
        />
      </StyledView>
      <StyledView>
        <StyledText>Go to Google</StyledText>
        <StyledLink path={externalSites.google}>
          <StyledImage source={images.googleLogo} />
        </StyledLink>
      </StyledView>
    </SafeAreaWrapper>
  )
}

export default Home
