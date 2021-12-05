const { Router } = require('express');
const Widget = require('../persistence/widgets');
const router = new Router();

router.post('/create', async (request, response) => {
  try {
    const { name } = request.body;
    if (!name) {
      return response
        .status(400)
        .json({ message: 'Widget type must be provided' })
    }
    const widget = await Widget.create(request.body.user.id, name)
    return response.status(200).json({
      message: `${name} widget created !`,
      widget
    })
  } catch (error) {
    console.error(
      `createWidget ({ name: ${request.body.name} }) >> Error: ${error.stack}`
    );
    return response.status(500).json();
  }
});

router.get('/', async (request, response) => {
  try {
    const widgets = await Widget.findAllWidgets(request.body.user.id)
    return response.status(200).json({
      message: 'Widgets sent',
      widgets
    })
  } catch (e) {
    console.error(
      `getAllWidgets ({ userID: ${request.body.user.id} }) >> Error: ${error.stack}`
    );
    return response.status(500).json();
  }
})

router.delete('/:widgetid', async (request, response) => {
  try {
    const check_exists = await Widget.findOneWidget(request.params.widgetid);
    if (!check_exists) {
      return response.status(404).json({ message: 'Widget does not exists' })
    }
    await Widget.deleteWidget(request.params.widgetid);
    return response.status(200).json({ message: 'deleted' })
  } catch (error) {
    console.error(
      `deleteWidget ({ id: ${request.params.widgetid} }) >> Error: ${error.stack}`
    );
    return response.status(500).json();
  }
})

router.put('/config/:widgetid', async (req, res) => {
  try {
    const check_exists = await Widget.findOneWidget(req.params.widgetid);
    if (!check_exists) {
      return res.status(404).json({ message: 'Widget does not exists' })
    }
    await Widget.updateConfig(req.params.widgetid, req.body.config)
    return res.status(200).json({ message: 'Updated' })
  } catch (e) {
    console.log(e)
  }
})

router.get('/get/:widgetid', async (req, res) => {
  try {
    const check_exists = await Widget.findOneWidget(req.params.widgetid);
    if (!check_exists) {
      return res.status(404).json({ message: 'Widget does not exists' })
    }
    const widget = await Widget.findOneWidget(req.params.widgetid)
    return res.status(200).json({ message: 'Widget sent', widget: widget[0] })
  } catch (e) {
    console.log(e)
  }
})

const calendar = require('./widgets/calendar')
const spotify = require('./widgets/spotify')
const weather = require('./widgets/weather')
const movies = require('./widgets/movies')

router.use('/calendar', calendar)
router.use('/spotify', spotify)
router.use('/weather', weather)
router.use('/movies', movies)
module.exports = router;
