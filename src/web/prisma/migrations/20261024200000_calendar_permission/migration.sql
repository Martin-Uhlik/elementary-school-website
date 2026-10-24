-- A separate access right for editing Průběh školního roku (/auth/prubeh-roku); admins have it anyway
ALTER TYPE "permission" ADD VALUE 'kalendar' BEFORE 'admin';
