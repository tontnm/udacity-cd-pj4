import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { getUserId } from '../utils';
import { createTodo } from '../../businessLogic/todos'
import { createLogger } from '../../utils/logger'

const logger = createLogger('createTodo')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info('createTodo event', { event })
    const userId = getUserId(event)
    const newTodo: CreateTodoRequest = JSON.parse(event.body)
    // TODO: Implement creating a new TODO item

    const newItem = await createTodo(userId, newTodo)

    return  {
      statusCode: 201,
      body: JSON.stringify({
        item: newItem
      })
    }}
)

handler.use(
  cors({
    credentials: true
  })
)
