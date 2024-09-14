
import ProfilePost from "./ProfilePost"
import { Grid } from "@chakra-ui/react"

const ProfilePosts = () => {
  return (
    <Grid
    templateColumns={{
      sm: "repeat(1, 1fr)",
      md: "repeat(3, 1fr)"
    }}
    gap={1}
    columnGap={1}>
    <ProfilePost img='/img5Amg-int.jpg' />
    <ProfilePost img='/img6Amg.jpg' />
    <ProfilePost img='/img7home.jpg' />
    <ProfilePost img='/imgSW.png' />
    </Grid>
  )
}
export default ProfilePosts