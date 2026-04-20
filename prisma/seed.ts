import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Clean existing data for a fresh start during testing
  await prisma.prescription.deleteMany()
  await prisma.appointment.deleteMany()
  await prisma.patient.deleteMany()
  await prisma.doctor.deleteMany()
  await prisma.user.deleteMany()

  // 1. Create Admin User
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@medlink.com',
      password: 'password', // Note: Using plain text based on our auth.ts configuration
      role: 'ADMIN',
    },
  })
  console.log(`Created Admin with id: ${admin.id}`)

  // 2. Create Doctor
  const doctorUser = await prisma.user.create({
    data: {
      name: 'Dr. Sarah Jenkins',
      email: 'sarah.jenkins@medlink.com',
      password: 'password',
      role: 'DOCTOR',
      doctor: {
        create: {
          specialization: 'Cardiology',
          experience: 15,
          fee: 150.00,
          bio: 'Top cardiologist with 15 years of experience in heart disease.',
          rating: 4.9
        }
      }
    },
    include: {
      doctor: true,
    }
  })
  console.log(`Created Doctor User: ${doctorUser.name}`)

  // 3. Create Patient
  const patientUser = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password',
      role: 'PATIENT',
      patient: {
        create: {} // Creates associated Patient profile
      }
    },
    include: {
      patient: true,
    }
  })
  console.log(`Created Patient User: ${patientUser.name}`)

  // 4. Create an Appointment
  if (doctorUser.doctor && patientUser.patient) {
    const appointment = await prisma.appointment.create({
      data: {
        doctorId: doctorUser.doctor.id,
        patientId: patientUser.patient.id,
        date: new Date(new Date().setDate(new Date().getDate() + 2)), // 2 days from now
        status: 'CONFIRMED',
        meetingLink: 'https://zoom.us/j/123456789'
      }
    })
    console.log(`Created Appointment: ${appointment.id}`)

    // 5. Create a Mock Prescription for that appointment
    const prescription = await prisma.prescription.create({
      data: {
        appointmentId: appointment.id,
        fileUrl: 'https://example.com/prescription.pdf',
        notes: 'Lisinopril 10mg, take 1 tab daily in the morning'
      }
    })
    console.log(`Created Prescription: ${prescription.id}`)
  }

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
