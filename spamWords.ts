export function createWordsSet(): Set<string> {
  return new Set([
    // Common spam words and phrases
    'viagra', 'cialis', 'casino', 'lottery', 'winner', 'prize', 'congratulations',
    'millionaire', 'inheritance', 'nigeria', 'prince', 'loan', 'credit',
    'free', 'guarantee', 'investment', 'cash', 'bonus', 'discount', 'offer',
    'limited', 'urgent', 'act now', 'click here', 'buy now', 'order now',
    'double your', 'earn extra', 'extra cash', 'fast cash', 'best rates',
    'cheap', 'clearance', 'deal', 'direct email', 'direct marketing',
    'fantasy', 'financial freedom', 'free access', 'free consultation',
    'free gift', 'free hosting', 'free info', 'free investment',
    'free membership', 'free money', 'free preview', 'free quote',
    'free trial', 'full refund', 'get paid', 'giveaway', 'guaranteed',
    'increase sales', 'increase traffic', 'incredible deal', 'insurance',
    'investment', 'lose weight', 'luxury', 'marketing', 'medicine',
    'meet singles', 'money back', 'once in lifetime', 'one time',
    'online biz', 'opportunity', 'opt in', 'pre-approved', 'refinance',
    'removal', 'rolex', 'satisfaction', 'save big', 'save up to',
    'special promotion', 'supplies', 'take action', 'trial', 'unlimited',
    'urgent', 'weight loss', 'while supplies last', 'win', 'winner',
    'winning', 'you have been selected', 'dear friend', 'bulk email',
    'buy direct', 'cancel at any time', 'check or money order', 'click',
    'click below', 'click here', 'click to remove', 'direct marketing',
    'email harvest', 'email marketing', 'form', 'increase your sales',
    'internet market', 'internet marketing', 'marketing solutions',
    'month trial offer', 'more internet traffic', 'multi level marketing',
    'notspam', 'one time mailing', 'online marketing', 'opt in',
    'performance', 'removal instructions', 'sale', 'sales', 'subscribe',
    'this isn\'t junk', 'this isn\'t spam', 'undisclosed recipient',
    'unsubscribe', 'visit our website', 'we hate spam', 'web traffic',
    'work at home', 'you were selected', 'your email address'
  ]);
}