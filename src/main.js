import Fastify from 'fastify'
const fastify = Fastify({
  logger: true,
  ajv: {
    customOptions: {
      formats: {
        date: /foo/,
        foo: /bar/
      }
    }
  }
});

fastify.post('/', {
  async handler () {
    return 'does not work';
  },
  schema: {
    body: {
      type: 'string',
      format: 'date'
    }
  }
});
fastify.post('/foo', {
  async handler () {
    return 'works';
  },
  schema: {
    body: {
      type: 'string',
      format: 'foo'
    }
  }
});



try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
