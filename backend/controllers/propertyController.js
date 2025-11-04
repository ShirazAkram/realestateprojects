import Property from "../models/Property.js";


export const createProperty = async (req, res) => {
  try {
    const property = await Property.create({
      ...req.body,
      owner: req.user._id, // link property to logged-in user
    });
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getProperties = async (req, res) => {
  try {
    const { location, type, minPrice, maxPrice } = req.query;

    const query = {};

    if (location) query.location = { $regex: location, $options: "i" };
    if (type) query.type = type;
    if (minPrice || maxPrice)
      query.price = {
        ...(minPrice ? { $gte: Number(minPrice) } : {}),
        ...(maxPrice ? { $lte: Number(maxPrice) } : {}),
      };

    const properties = await Property.find(query).populate("owner", "name email");
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate("owner", "name email");
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });

    if (property.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProperty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });

    if (property.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await property.deleteOne();
    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
