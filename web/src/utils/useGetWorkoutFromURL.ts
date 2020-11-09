import { useWorkoutQuery } from "../generated/graphql";
import { useGetIntId } from "./useGetIntId";

export const useGetWorkoutFromUrl = () => {
  const intId = useGetIntId();
  return useWorkoutQuery({
    skip: intId === -1,
    variables: {
      id: intId,
    },
  });
};
