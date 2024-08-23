import { Avatar, Box, Flex, Tooltip } from "@chakra-ui/react";

const UpperBar = () => {
  const UpperBarItems = [
    {
      icon: <Avatar size="md" src="img1.png" />,
      text: "User profile 1",
    },
    {
      icon: <Avatar size="md" src="img2.png" />,
      text: "User profile 2",
    },
    {
      icon: <Avatar size="md" src="img3.png" />,
      text: "User profile 3",
    },
    {
      icon: <Avatar size="md" src="img4.png" />,
      text: "User profile 4",
    },
    {
      icon: <Avatar size="md" src="img1.png" />,
      text: "User profile 1",
    },
    {
      icon: <Avatar size="md" src="img2.png" />,
      text: "User profile 2",
    },
    {
      icon: <Avatar size="md" src="img3.png" />,
      text: "User profile 3",
    },
    {
      icon: <Avatar size="md" src="img4.png" />,
      text: "User profile 4",
    },
  ];

  return (
    <Box w="full" h="full" p={4} >
      <Flex direction="row" gap={4} >
        {UpperBarItems.map((item, index) => (
          <Tooltip
            key={index}
            hasArrow
            label={item.text}
            openDelay={500}
          >
            <Box display={{ base: "none", md: "block" }} cursor="pointer">
              {item.icon}
            </Box>
          </Tooltip>
        ))}
      </Flex>
    </Box>
  );
};

export default UpperBar;
