
-- Create instructors table
CREATE TABLE public.instructors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  specialization TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create courses table
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  difficulty_level TEXT NOT NULL DEFAULT 'beginner',
  max_participants INTEGER NOT NULL DEFAULT 20,
  price DECIMAL(10,2) NOT NULL,
  duration_hours INTEGER NOT NULL,
  location TEXT,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'upcoming',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create course_instructors table (many-to-many relationship)
CREATE TABLE public.course_instructors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID REFERENCES public.courses NOT NULL,
  instructor_id UUID REFERENCES public.instructors NOT NULL,
  role TEXT DEFAULT 'instructor',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(course_id, instructor_id)
);

-- Create course_participants table
CREATE TABLE public.course_participants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID REFERENCES public.courses NOT NULL,
  user_id UUID REFERENCES auth.users NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  documents_signed BOOLEAN DEFAULT false,
  registration_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  notes TEXT,
  UNIQUE(course_id, user_id)
);

-- Create instructor_notes table for participant notes
CREATE TABLE public.instructor_notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  instructor_id UUID REFERENCES public.instructors NOT NULL,
  participant_id UUID REFERENCES auth.users NOT NULL,
  course_id UUID REFERENCES public.courses,
  note TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create invoices table
CREATE TABLE public.invoices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID REFERENCES public.courses NOT NULL,
  user_id UUID REFERENCES auth.users NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  invoice_number TEXT NOT NULL UNIQUE,
  issued_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  due_date TIMESTAMP WITH TIME ZONE NOT NULL,
  paid_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.instructor_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

-- RLS Policies for instructors
CREATE POLICY "Instructors can view their own profile" ON public.instructors
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Instructors can update their own profile" ON public.instructors
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for courses
CREATE POLICY "Everyone can view courses" ON public.courses
  FOR SELECT USING (true);

CREATE POLICY "Instructors can view all courses" ON public.courses
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.instructors 
      WHERE user_id = auth.uid()
    )
  );

-- RLS Policies for course_instructors
CREATE POLICY "Instructors can view their course assignments" ON public.course_instructors
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.instructors 
      WHERE user_id = auth.uid() AND id = instructor_id
    )
  );

-- RLS Policies for course_participants
CREATE POLICY "Users can view their own participation" ON public.course_participants
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Instructors can view participants in their courses" ON public.course_participants
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.course_instructors ci
      JOIN public.instructors i ON ci.instructor_id = i.id
      WHERE ci.course_id = course_participants.course_id
      AND i.user_id = auth.uid()
    )
  );

-- RLS Policies for instructor_notes
CREATE POLICY "Instructors can manage their own notes" ON public.instructor_notes
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.instructors 
      WHERE user_id = auth.uid() AND id = instructor_id
    )
  );

-- RLS Policies for invoices
CREATE POLICY "Users can view their own invoices" ON public.invoices
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Instructors can view invoices for their courses" ON public.invoices
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.course_instructors ci
      JOIN public.instructors i ON ci.instructor_id = i.id
      WHERE ci.course_id = invoices.course_id
      AND i.user_id = auth.uid()
    )
  );

-- Function to check if user is instructor
CREATE OR REPLACE FUNCTION public.is_instructor(user_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.instructors 
    WHERE user_id = user_uuid
  );
$$;

-- Function to handle new instructor creation
CREATE OR REPLACE FUNCTION public.handle_new_instructor()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.instructors (user_id, full_name, email)
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data->>'full_name',
    NEW.email
  );
  RETURN NEW;
END;
$$;
