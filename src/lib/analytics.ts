// Google Analytics 4 Event Helpers

type GAEventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (
      command: 'event',
      eventName: string,
      eventParams?: GAEventParams
    ) => void;
  }
}

export function trackEvent(eventName: string, params?: GAEventParams) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  } else {
    // Helpful development debug log
    if (process.env.NODE_ENV === 'development') {
      console.log(`[GA4 Track Event]: ${eventName}`, params);
    }
  }
}

export const analytics = {
  clickLine: (placement: string) => trackEvent('click_line', { placement }),
  clickFacebook: (placement: string) => trackEvent('click_facebook', { placement }),
  clickPhone: (placement: string) => trackEvent('click_phone', { placement }),
  clickBooking: (placement: string) => trackEvent('click_booking', { placement }),
  bookingFormStart: () => trackEvent('booking_form_start'),
  bookingFormSubmit: (data: { vehicleType: string; service: string }) =>
    trackEvent('booking_form_submit', data),
  viewPricing: () => trackEvent('view_pricing'),
  viewPortfolio: () => trackEvent('view_portfolio'),
  clickService: (serviceName: string) => trackEvent('click_service', { serviceName }),
  clickSendLocation: () => trackEvent('click_send_location'),
  clickTruckQuote: () => trackEvent('click_truck_quote'),
};
