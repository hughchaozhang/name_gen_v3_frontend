import { Hono } from 'hono'
import { renderer } from './renderer'
import { NameWok } from './namewok'

const app = new Hono()
app.use(renderer)

app.get('/', (c) => {
  return c.render(<NameWok />)
})

export default app