import React, { useState, useEffect } from "react";
import { Box, Button, Container, Progress, Text, VStack, useToast } from "@chakra-ui/react";
import { FaPlay, FaPause, FaRedo } from "react-icons/fa";

const Index = () => {
  const [isComputing, setIsComputing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState([]);
  const toast = useToast();

  useEffect(() => {
    let intervalId;

    // Assuming a simple Mersenne prime calculator function is already defined
    const calculateMersennePrimes = (start, count) => {
      let primes = [];
      // ... Mersenne prime calculation logic ...
      return primes;
    };

    if (isComputing) {
      intervalId = setInterval(() => {
        setProgress((oldProgress) => oldProgress + 1);
        setResult(calculateMersennePrimes(2, progress + 1));
        if (progress >= 100) {
          clearInterval(intervalId);
        }
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isComputing]);

  const handleStart = () => {
    setIsComputing(true);
    toast({
      title: "計算を開始しました",
      description: "メルセンヌ素数の生成を開始しました。",
      status: "info",
      duration: 9000,
      isClosable: true,
    });
  };

  const handlePause = () => {
    setIsComputing(false);
  };

  const handleReset = () => {
    setIsComputing(false);
    setProgress(0);
  };

  return (
    <Container centerContent>
      <VStack spacing={4} marginY={12}>
        {result.length > 0 && <Text>最新のメルセンヌ素数: {result[result.length - 1]}</Text>}
        <Text fontSize="2xl">メルセンヌ素数ジェネレーター</Text>
        <Progress width="100%" value={progress} />
        <Box>
          {isComputing ? (
            <Button leftIcon={<FaPause />} onClick={handlePause}>
              一時停止
            </Button>
          ) : (
            <Button leftIcon={<FaPlay />} onClick={handleStart}>
              開始
            </Button>
          )}
          <Button leftIcon={<FaRedo />} onClick={handleReset} ml={2}>
            リセット
          </Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
