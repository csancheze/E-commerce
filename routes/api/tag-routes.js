const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include:[{ model: Product, through: ProductTag, as: 'products_with_tag'}],
    });
    res.status(200).json(tagData);
    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
    try {
      const tagData = await Tag.findByPk(req.params.id, {
        include: [{ model: Product, through: ProductTag, as: 'products_with_tag' }],
      });
  
      if (!tagData) {
        res.status(404).json({ message: 'No tag found with this id!' });
        return;
      }
  
      res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
  });



router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});



router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update({
      category_name: req.body.tag_name
    },
    {
      where: {
        tag_id: req.params.id
      },
    }
    );
    if (!tagData) {
      res.status(404).json({message: 'No tag found with this id!'});
      return;
    }
    res.status(200).json(tagData)

  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id:req.params.id
      }
    });
    if (!tagData) {
      res.status(404).json({message: 'No tag found with this id!'})
      return;
    }
  } catch (err) {
    res.status(500).json(err)
  }
});

  // delete on tag by its `id` value


module.exports = router;
