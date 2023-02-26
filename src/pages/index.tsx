import React, { useState } from 'react';
import { Flex, Heading, Text } from '@chakra-ui/react';
import { DragDropContext } from 'react-beautiful-dnd';
import { initialData } from '@/data';
import dynamic from 'next/dynamic';

const Column = dynamic(() => import("../Column"), { ssr: false });

const reorderColumnList = (sourceCol: any, startIndex: any, endIndex: any) => {
  const newTaskIds = Array.from(sourceCol.taskIds);
  const [removed] = newTaskIds.splice(startIndex, 1);
  newTaskIds.splice(endIndex, 0, removed);

  const newColumn = {
    ...sourceCol,
    taskIds: newTaskIds,
  };

  return newColumn;
};

export default function Home() {
  const [state, setState] = useState(initialData)

  const onDragEnd = (result: { destination: any; source: any; }) => {
    const { destination, source } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceCol = state.columns[source.droppableId];
    const destinationCol = state.columns[destination.droppableId];

    if (sourceCol.id === destinationCol.id) {
      const newColumn = reorderColumnList(
        sourceCol,
        source.index,
        destination.index
      );

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };
      setState(newState);
      return;
    }

    const startTaskIds = Array.from(sourceCol.taskIds);
    const [removed] = startTaskIds.splice(source.index, 1);
    const newStartCol = {
      ...sourceCol,
      taskIds: startTaskIds,
    };

    const endTaskIds = Array.from(destinationCol.taskIds);
    endTaskIds.splice(destination.index, 0, removed);
    const newEndCol = {
      ...destinationCol,
      taskIds: endTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      },
    };

    setState(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Flex 
        flexDir="column" 
        bg="white" 
        minH="100vh"  
        w="full"
        color="black" 
        pb="2rem"
      >
        <Flex py="4rem" px="4rem" flexDir="column">
          <Heading fontSize="3xl" fontWeight={600}>
            Stellar Culinary Personnel LTD
          </Heading>
          <Text fontSize="20px" fontWeight={600} color="off-white">
            Kanban Board
          </Text>
        </Flex>

        <Flex justify="column" px="4rem">
          {state.columnOrder.map((columnId: string | number) => {
            const column = state.columns[columnId];
            const tasks = column.taskIds.map((taskId: string | number) => state.tasks[taskId]);

            return <Column key={column.id} column={column} tasks={tasks} />;
          })}
        </Flex>
      </Flex>
    </DragDropContext>
  )
}