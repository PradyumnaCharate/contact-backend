
const contactsController = require('../controllers/contactController')


const router = require('express').Router()



router.post('/addContact',  contactsController.addContact)

router.get('/all', contactsController.getAllContacts)


 router.get('/:id', contactsController.getOneContact)
 router.post('/:id', contactsController.addPhone)
 router.put('/:id', contactsController.updateContact)

router.delete('/:id', contactsController.deleteContact)

module.exports = router