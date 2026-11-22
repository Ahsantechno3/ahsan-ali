/**
 * Kahin se bhi (Hero, Header, CTA, project cards) ye call karo —
 * aik hi reusable modal khul jata hai. projectType diya jaye to
 * wo type pehle se select ho jati hai.
 *
 * Performance: ye helper jaan bujh kar aik alag chhoti file mein hai
 * taake isay import karne walay components (Hero, Header, Projects…)
 * poora ContactModal apne chunk mein na kheench lein — modal khud
 * ContactModalLazy ke zariye lazily load hota hai.
 */
export function openContactModal(projectType?: string) {
  window.dispatchEvent(
    new CustomEvent<string>("open-contact-modal", { detail: projectType ?? "" })
  );
}
