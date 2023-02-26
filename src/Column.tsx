import React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { initialData } from "./data";
import { Draggable, Droppable } from "react-beautiful-dnd";

const Column = ({ column, tasks }: any) => {
    return (
      <Flex mr="2vw" rounded="3px" bg="yellow" w="400px" h="620px" flexDir="column">
        <Flex align="center" h="65px" bg="dark-yellow" rounded="3px 3px 0 0" px="1.5rem" mb="1.5rem">
          <Text fontSize="18px" fontWeight={600} color="black">
            {column.title}
          </Text>
        </Flex>

        <Droppable droppableId={column.id}>
          {(droppableProvided, droppableSnapshot) => (
            <Flex px="1.5rem" flex={1} flexDir="column" ref={droppableProvided.innerRef} {...droppableProvided.droppableProps}>
              {tasks.map((task: any, index: number) => (
                <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                  {(draggableProvided, draggableSnapshot) => (
                    <Flex mb="1rem" minH="72px" bg="off-yellow" rounded="3px" p="1.5rem" ref={draggableProvided.innerRef} {...draggableProvided.draggableProps} {...draggableProvided.dragHandleProps}>
                      <Text color="black">{task.content }</Text>
                    </Flex>
                  )}
                </Draggable>
              ))}
            </Flex>
          )}
        </Droppable>
        <Button py="1vw" fontSize="26px" bgColor="dark-yellow" color="black" rounded="0 0 3px 3px">
          +
        </Button>
      </Flex>
    );
};

export default Column;