/** Before/after cards in the landing-page hero carousel (first = centre card). */
export interface Testimonial {
  name: string;
  duration: string;
  quote: string;
  before: string;
  after: string;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Linda K.',
    duration: '12 NEDĒĻAS',
    quote: '"-8kg tauku, +spēks un pārliecība."',
    before: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=800&auto=format&fit=crop',
    after: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Artūrs P.',
    duration: '8 NEDĒĻAS',
    quote: '"-6kg tauku, +5kg muskuļi. Process strādā."',
    before: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop',
    after: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Zane M.',
    duration: '16 NEDĒĻAS',
    quote: '"Beidzot jūtos stipra savā ķermenī. Enerģija visai dienai!"',
    before: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg',
    after: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop',
  },
];
