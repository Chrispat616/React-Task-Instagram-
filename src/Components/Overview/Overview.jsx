import { Box, Flex, Spinner } from "@chakra-ui/react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useEffect, useState } from "react";
import useUserProfileStore from "../../store/userProfileStore";
import usePostStore from "../../store/postStore";

const Overview = () => {
  const { userProfile } = useUserProfileStore();
  const { posts } = usePostStore();

  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    if (!userProfile || !posts) {
      return;
    }

    const totalLikes = posts.reduce((sum, post) => sum + post.likes.length, 0);
    const totalComments = posts.reduce(
      (sum, post) => sum + post.comments.length,
      0
    );

    setRowData([
      { category: "Uploads", count: userProfile.posts.length },
      { category: "Likes", count: totalLikes },
      { category: "Comments", count: totalComments },
    ]);
  }, [userProfile, posts]);
  const columns = [
    { headerName: "Category", field: "category" },
    { headerName: "Counts", field: "count" },
  ];
  const defaultColDef = { filter: true };

  if (!userProfile || !posts) {
    return (
      <Flex w="400px" h="180px" alignItems="center" justifyContent="center">
        <Spinner size="lg" />
      </Flex>
    );
  }

  return (
    <Flex w="400px" h="180px" alignSelf={"flex-start"}>
      <Box w="100%" h="100%" className="ag-theme-quartz-dark">
        <AgGridReact
          rowData={rowData}
          columnDefs={columns}
          defaultColDef={defaultColDef}
        />
      </Box>
    </Flex>
  );
};

export default Overview;
