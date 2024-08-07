import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useLocalSearchParams } from "expo-router";
import EmptyState from "../../components/EmptyState";
import SearchInput from "../../components/SearchInput";
import VideoCard from "../../components/VideoCard";
import { getAllPosts, getBookmarkVideo, searchPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";

const Bookmark = () => {
  // const { query } = useLocalSearchParams();
  const query = "";
  // const { data: posts, refetch } = useAppwrite(() => getAllPosts());
  const { data: posts, refetch } = useAppwrite(() =>
    getBookmarkVideo("666ae6860016149ac1d5")
  );

  // useEffect(() => {
  //   refetch();
  // }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        // data={[]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="font-pmedium text-2xl text-gray-100">
              Saved Video
            </Text>
            {/* <Text className="text-2xl font-psemibold text-white">{query}</Text> */}
            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Saved Video Found"
            subtitle="No videos found in bookmark list. "
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Bookmark;
