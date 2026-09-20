export const resolvers = {
    Query: {
        greeting: () => 'Hello world' ,
        jobs: () => {
            return [
                {
                id : 'test-id01',
                title: 'The Title 01',
                description: 'Thhe description',
            },
                            {
                id : 'test-id02',
                title: 'The Title 02',
                description: 'Thhe description',
            }

        ]
        }
    },
}
