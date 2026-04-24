export { mockFetchActionsResponse };
declare const mockFetchActionsResponse: {
    data: {
        actions: {
            blockInfo: {
                distanceFromMaxBlockHeight: number;
            };
            actionState: {
                actionStateOne: string;
                actionStateTwo: string;
            };
            actionData: {
                accountUpdateId: string;
                data: string[];
            }[];
        }[];
    };
};
