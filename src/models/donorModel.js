const { v4: uuid } = require('uuid');

let donors = [];

function create(data) {
  const donor = {
    id: uuid(),
    name: data.name,
    bloodGroup: data.bloodGroup,
    city: data.city,
    contact: data.contact,
    available: true,
    lastDonatedAt: null,
    createdAt: new Date().toISOString()
  };
  donors.push(donor);
  return donor;
}

function findAll(filters = {}) {
  return donors.filter((donor) => {
    if (filters.bloodGroup && donor.bloodGroup !== filters.bloodGroup) return false;
    if (filters.city && donor.city.toLowerCase() !== filters.city.toLowerCase()) return false;
    if (filters.availableOnly && !donor.available) return false;
    return true;
  });
}

function findById(id) {
  return donors.find((donor) => donor.id === id);
}

function findByContact(contact) {
  return donors.find((donor) => donor.contact === contact);
}

function updateAvailability(id, available) {
  const donor = findById(id);
  if (!donor) return null;
  donor.available = available;
  if (!available) {
    donor.lastDonatedAt = new Date().toISOString();
  }
  return donor;
}

function remove(id) {
  const index = donors.findIndex((donor) => donor.id === id);
  if (index === -1) return false;
  donors.splice(index, 1);
  return true;
}

module.exports = {
  create,
  findAll,
  findById,
  findByContact,
  updateAvailability,
  remove
};
