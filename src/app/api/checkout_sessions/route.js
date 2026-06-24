import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '../../../lib/stripe';
import { getUser } from '@/lib/api/session';

export async function POST(req) {
  try {
    const headersList = await headers();
    const host = headersList.get('host');
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    const origin = `${protocol}://${host}`;

    // বডি রিড করার নিরাপদ ফলব্যাক
    const body = await req.json().catch(() => ({}));
    const { type } = body;

    const user = await getUser();

    let lineObj;
    let metaObj = {};

    if (type === 'payment') {
      // ১. ওয়ান-টাইম লয়ার পাবলিশিং/ভেরিফিকেশন ফি
      lineObj = {
        price: 'price_1TlHqSEvZ8vKkyGb10jKIalp', // আপনার Stripe ড্যাশবোর্ডের প্রডিউসড আইডি
        quantity: 1,
      };

      // এখানে মেটাডাটা পাঠানো জরুরি, তা না হলে Webhook ইউজারকে চিনবে না
      metaObj = {
        userId: user?.id || user?._id || '',
        email: user?.email || '',
        paymentType: 'lawyer_verification',
      };
      
    } else {
      // ২. ক্লায়েন্টের ইভেন্ট টিকিট বা অ্যাপয়েন্টমেন্ট বুকিং
      lineObj = {
        price_data: {
          currency: 'usd',
          unit_amount: Math.round(Number(body.ticketPrice || 0) * 100), // দশমিক ফ্লোট এড়াতে Math.round
          product_data: {
            name: body.eventTitle || 'Legal Ease Consultation/Event',
          },
        },
        quantity: Number(body.quantity || 1),
      };

      metaObj = {
        userId: user?.id || user?._id || '',
        email: user?.email || '',
        eventId: body?.eventId || '',
        paymentType: 'event_booking',
        eventTitle: body?.eventTitle || '',
        amount: (Number(body?.ticketPrice || 0) * Number(body?.quantity || 1)).toFixed(2),
        quantity: body?.quantity || 1,
      };
    }

    // ডাইনামিক সাকসেস ইউআরএল জেনারেট
    const successUrl =
      type === 'payment'
        ? `${origin}/dashboard/lawyer/premium-success?session_id={CHECKOUT_SESSION_ID}`
        : `${origin}/success?session_id={CHECKOUT_SESSION_ID}`;

    // Stripe সেশন তৈরি
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email || undefined, // ইউজার লগইন না থাকলে undefined রাখবে যেন Stripe ক্র্যাশ না করে
      line_items: [lineObj],
      metadata: metaObj,
      // মোড ঠিক করা হয়েছে: ইভেন্ট বুকিং ও পাবলিশিং ফি দুটোর জন্যই মোড হবে 'payment'
      mode: 'payment', 
      success_url: successUrl,
      cancel_url: `${origin}/cancel`,
    });

    return NextResponse.json({
      url: session.url,
    });
  } catch (err) {
    console.error("Stripe Checkout Error: ", err);

    return NextResponse.json(
      {
        error: err.message || "Internal Server Error",
      },
      {
        status: err.statusCode || 500,
      }
    );
  }
}